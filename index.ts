import 'dotenv/config';

import app from './src/app';
import connectDB from './src/database';

const port = process.env.PORT || 3000;


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("Error starting server:", error);
});
