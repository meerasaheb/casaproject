/**
 * TenantController
 *
 * @description :: Server-side logic for managing Tenants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `TenantController.index()`
     */
    // index: function (req, res) {
    //   Tenant.find(function(err,index){
    //     if(err){
    //       return res.send(err,500);
    //     }
    //     res.json({TenantIndex:index});
    //   });
    // },


    /**
     * `TenantController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Tenant.findOne(id, function(err, show) {
            if (err) {
                res.send(err, 500);
            }
            console.log(show);
            res.json({ TenantShow: show });
        });

    },


    /**
     * `TenantController.new()`
     */
    new: function(req, res) {
        res.new();
    },


    /**
     * `TenantController.create()`
     */
    create: function(req, res) {
        var params = req.params.all();
        var result = [];
        Tenant.create(params, function(err, tenantcreate) {
            if (err) {
                return res.send(err, 500);
            }
            return res.json({ Tenantcreate: tenantcreate });

        });
    },


    /**
     * `TenantController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `TenantController.update()`
     */
    update: function(req, res) {
        var params = req.params.all();
        var id = req.param('id');

        console.log(id);
        Tenant.update(id, params, function(err, update) {
            if (err) {

                res.send(err, 500);
            }
            console.log("update");
            console.log(update);
            res.json({ Tenantupdate: update });
        });
    },


    /**
     * `TenantController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        var entitiesId;
        console.log(id);

        Tenant.find(id).populate("entities").exec(function(err, tenant) {
            if (err) return res.send(err, 500);
            if (!tenant) return res.send("ghfdjsk", 404);




            Entities.find({ tenant: id }).exec(function(err, findentities) {
                if (err) return res.send(err, 500);

                _.each(findentities, entiy => {
                    Fields.destroy({ child: entiy.id }).exec(function(err, fields) {
                        if (err) return res.send(err, 500);
                        console.log(fields);
                        Entities.destroy({ tenant: id }).exec(function(err, entities) {
                            if (err) return res.send(err, 500);

                        });

                    });
                });
                //var entitiesId;
                console.log(id);
                entitiesId = findentities.id;
                console.log(findentities);
                Tenant.destroy({ id: id }).exec(function(err) {
                    if (err) return res.send(err, 500);
                    console.log(id);
                });


                // });

                res.json({ destroy: "delete" });
            });
        });

    },
};
