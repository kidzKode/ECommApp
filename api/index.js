const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

require('dotenv').config(); 
const app = express();
const port = process.env.PORT;;
const cors = require('cors')
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('server is running on port 8000')
});
// mongodb+srv://aryn17:TigerMongo@mern.4b5ch76.mongodb.net/MERN-Ecommerce?retryWrites=true&w=majority&appName=MERN
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to mongodb")
}).catch((err) => {
    console.log('err connecting to mongodb', err);
})



// const user = require('./models/user')
const User = require('./models/user');
const Order = require('./models/order');

//function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {

    // console.log('Creating transporter...');
    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        //configure the email service
        service: 'gmail',
        auth: {
            user: 'nravi2985@gmail.com',
            pass: 'brswynkoifggdnf',

        }

    })

    //compose the email msg
    const mailOptions = {
        from: 'shopcart.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`
       
    }
    //send the email
console.log('Sending Mail');

    try {
        await transporter.sendMail(mailOptions)
        console.log("Verification email sent successfully")

    }
    catch (err) {
        console.log("error sending verification email", err)

    }
}

//endPoints to register and login
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check email is already entered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already registered' })
        }
        // create enw user/
        const newUser = new User({ name, email, password })

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save teh user in database
        await newUser.save();

        //send verification email to the user
        console.log('data savad in database')
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } 
    catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
     }
});




//endpoits to verify the email
app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token

        //find the user with the given verification token
        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({ message: "invalid verification token" })
        }
        //verified mark user
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' })
    } catch (err) {
        res.status(500).json({ message: "Email verification failed" });

    }
})
const generateSecretKey=()=>{
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey;
}
const secretKey = generateSecretKey();

//endpoint to login the user!
app.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
        //check the user 
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:'invalid email or password'})
             
        }
        //if correct
        if(user.password !==password){
            return res.status(401).json({message:'invalid password'})
        }

        //generate a token
        const token = jwt.sign({userId:user._id},secretKey)
          res.status(200).json({token})

    }catch (err) {
        res.status(500).json({ message: "Login  failed" });

    }


})

//end point for saving address to the backend
app.post('/addresses',async (req,res)=>{
    try{
        const {userId, address} = req.body;
        // find the user by the userId
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        // add the new address to users address array
        user.addresses.push(address)

        //save the updated user in to backend
        await user.save();

        res.status(200).json({message:'address creaetd successfully'})
        }
        catch(err){
            res.status(500).json({message:'Error adding address'})
        }
})

// end point to get all address of particulr use
app.get('/addresses/:userId', async (req,res)=>{
    try{
        const userId = req.params.userId
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({meesage:'user not found'})

        }
        const addresses= user.addresses;
        res.status(200).json({addresses})

    }
    catch(err){
        res.status(500).json({message:'Error retriveing the addresses'})
    }
})
//end point to store all orders
app.post('/orders',async(req,res)=>{
    try{
        const{userId,cartItems,totalPrice,shippingAddress,paymentMethod} =req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        //create an array of product object from the cart items
        const products =  cartItems.map((item)=>(
            {
                name:item?.title,
                quantity:item.quantity,
                price:item.price,
                image:item?.image,

            }))
            //create a new order
            const order = new Order({
                user:userId,
                products:products,
                totalPrice:totalPrice,
                shippingAddress:shippingAddress,
                paymentMethod: paymentMethod
            })
            console.log("shippingAddress--",shippingAddress)
            await order.save();
            res.status(200).json({message:"order created successfully!"})
  
       }
    catch(err){
        console.log('error creating orders',err)
        res.status(500).json({message:'error creating orders'})
    }
})

//get the user Profile
app.get('/profile/:userId',async(req,res)=>{
    try{
          const userId = req.params.userId;
          const user = await User.findById(userId);

          if(!user){
            return res.status(404).json({message:'user not found'})
        }

        res.status(200).json({user})



    }
    catch(err){

        console.log('error creating orders',err)
        res.status(500).json({message:'error retrieving the user  profiel'})
    }
})

app.get('/orders/:userId',async(req,res)=>{
    try{
    const userId = req.params.userId;
    const  orders = await Order.find({user:userId}).populate('user');

    if(!orders || orders.length ===0){
        return res.status(404).json({message:'No order found for this user'})

    }
    res.status(200).json({orders});

    } catch(err){

        res.status(500).json({message:'Error'})
    }
})