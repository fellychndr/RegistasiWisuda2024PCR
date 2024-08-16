import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
    phone: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

},
    { timestamps: true }
);


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', UserSchema);