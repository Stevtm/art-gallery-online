app.get('/image', (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    } else {
      res.render('imagesPage', { items: items });
    }
  });
});

app.post('/image', upload.single('image'), (req, res, next) => {
  const obj = {
    name: req.body.name,
    description: req.body.description,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
  };

  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect('/');
    }
  });
});