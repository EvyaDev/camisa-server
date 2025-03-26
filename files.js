const fs = require("fs");
const formidable = require("formidable");


function uploadFile(req, res) {
    // return console.log("הבקשה הגיעה");

    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        const file = files.myFile[0];

        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];

        if (!allowed.includes(file.mimetype)) {
            return res.status(403).send('Invalid file type specified for ' + file.originalFilename + ': ' + file.mimetype);
        }

        if (file.size > 1000 * 1024 * 3) {
            return res.status(403).send('Invalid file size specified for ' + file.originalFilename + ': ' + file.size);
        }

        fs.copyFile(file.filepath, `./files/${file.originalFilename}`, err => {
            if (err) {
                return res.status(500).json({ success: false, message: "שגיאה בהעתקת הקובץ" });
            }

            res.status(200).json({ success: true, message: "התמונה עלתה בהצלחה", fileUrl: `http://localhost:421/file/${file.originalFilename}` });
        });

    });
}




exports.uploadFile = uploadFile;
