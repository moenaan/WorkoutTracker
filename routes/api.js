const Workout = require('../models/workout.js');
const router = require('express').Router();

//post routes for workout
router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//delet routes for workouts
router.delete('/api/workouts', ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//update routes for workout
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {

  db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
          $inc: { totalDuration: req.body.duration },
          $push: { exercises: req.body }
      },
      { new: true }).then(dbWorkout => {
          res.json(dbWorkout);
      }).catch(err => {
          res.json(err);
      });

});  

//get routes for the 7 day averages for time
router.get('/api/workouts', (req, res) => {
	Workout.aggregate([ 
		{$addFields: {
			totalDuration: 
				{
					$sum: '$exercises.duration'
				}
		}}
	])
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

//get routes for the 7 day averages 
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;