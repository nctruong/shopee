import mongoose from "mongoose";
import { PasswordService } from "../services/password"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            delete ret.__v
            delete ret._id
        }
    }
})
userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
}
userSchema.pre('save', async function(done) {
    if (this.isModified("password")) {
        const hashed = await PasswordService.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done()
})
// User interface to force inputting the correct attributes
interface UserAttributes {
    email: string;
    password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttributes): UserDoc
}
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
