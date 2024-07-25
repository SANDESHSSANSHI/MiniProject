import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb+srv://allinoneglobe2003:SFkKztHuHd5JFruh@nexus-chat-application.sbnxgra.mongodb.net/nexus`;
    try {
        // Connect to MongoDB
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default Connection;
