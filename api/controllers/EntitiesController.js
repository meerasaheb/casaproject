/**
 * EntitiesController
 *
 * @description :: Server-side logic for managing entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `EntitiesController.index()`
     */
    // index: function (req, res) {
    //   Entities.find()

    //   //.populate('fields')

    //   .populateAll()
    //   .exec(function(err,index){
    //     if(err){
    //       return res.send(err,500);
    //     }
    //     return res.json({Entitiesindex:index});
    //   });
    // },


    /**
     * `EntitiesController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
         Entities.findOne(id).populate('fields').exec(function(err, show) {
            if (err) {
                return res.send("tenents with givec id" + id + "was not  found");

            }
            return res.json({ EntityTypeShow: show });
        });
    },


    /**
     * `EntitiesController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `EntitiesController.create()`
     */
    create: function(req, res) {
        console.log("hi");
        var params = req.params.all();
        //console.log(params);
        var id;
        Entities.create(params, function(err, create) {
            console.log("pp");
            if (err) return res.send(err, 500);
            id = create.id;
            Entities.find({ id: id }).populate('fields').exec(function(err, entitiesFields) {
                if (err) return res.send(err, 500);
                console.log(entitiesFields);
                res.json({ entitiesCreated: entitiesFields });
            });
            // res.json({entitiesCreated: create});
        });

    },
    /**
     * `EntitiesController.edit()`
     */
    edit: function(req, res) {
         return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `EntitiesController.update()`
     */
    update: function(req, res) {
        var values = req.params.all();
        var id = req.param('id');
        Entities.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            res.json({ EntitiesUpdate: update });
        });
    },


    /**
     * `EntitiesController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        Entities.find(id, function(err, entities) {
            if (err) return res.send(err, 500);
            if (!entities) return res.send("No user with that id.", 404);

            Entities.destroy({ id: id }).exec(function(err, entities) {
                if (err) return res.send(err, 500);
                Fields.destroy({ entities: id }).exec(function(err, fields) {
                    if (err) return res.send(err, 500);
                });
            });
            res.json({ EntitiesValues: "deleted" });
        });
    }
};
