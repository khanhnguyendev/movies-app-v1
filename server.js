const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());

const movieDir = 'D:/Movies/MP4';
const moviesFilePath = 'movies.json';
const PORT = '5000'
const URL = `http://localhost:${PORT}`;

// Generate movies data
const movies = [];

fs.readdirSync(movieDir).forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.mp4' || ext === '.avi' || ext === '.mkv') {
        const name = path.basename(file, ext);
        movies.push({
            title: name,
            path: `${URL}/movies/${file}`,
            // poster: `${movieDir}/${name}.jpg`,
            type: 'video/mp4',
        });
    }
});

const data = JSON.stringify(movies);
fs.writeFileSync(moviesFilePath, data);
console.log('Movie data generated successfully');
console.log(data);

// Serve movies data
app.get('/api/movies', (req, res) => {
    const moviesData = fs.readFileSync(moviesFilePath, 'utf8');
    const movies = JSON.parse(moviesData);
    res.json(movies);
});

app.use('/movies', express.static('D:/Movies/MP4'));

app.get('/movies/:file', function(req, res){
    var file = req.params.file;
    var filePath = path.join('D:/Movies/MP4', file);
    var stat = fs.statSync(filePath);
    res.setHeader('Content-Disposition', 'attachment; filename=' + file);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', stat.size);
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
