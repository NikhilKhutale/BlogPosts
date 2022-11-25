import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


export const register = (req, res) => {

    const q = "SELECT * FROM admin WHERE name =? OR email = ?"
    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already existed!") 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        
        const q = "INSERT INTO admin(`name`,`email`, `status` ,`password`) VALUES (?)"

        const values = [
            req.body.username,
            req.body.email,
            req.body.status,
            hash
        ]
        //console.log(values)
        db.query(q, [values], (err, data) => {
            //console.log(err)
            if (err) return res.json(err)



            const q = "SELECT * FROM admin WHERE email = ?"
            db.query(q, [req.body.email], (err, data) => {
                if (err) return res.json(err)
                const { password, ...other } = data[0]
                return res.status(200).json(other)
            })

        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM admin WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not registered")
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(404).json("Wrong username or password")


        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRETE)
        
        const { password, ...other } = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.")
}

export const getWriters = (req,res) => {
    const q = "SELECT `id`, `name`, `status`, `email` FROM admin"

    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}
