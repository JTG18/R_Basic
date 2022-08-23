sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("roehm.jt.mockup.mockup.controller.Table", {

            onInit: function () {
                //get the router
                var oRouter = this.getOwnerComponent().getRouter();
                //attach listener on route matching
                //to route teams: refreshing table
                oRouter.attachRouteMatched(function (oEvent) {
                    if (oEvent.getParameter("name") != "Table") {
                        console.log(oEvent);
                        return;
                    }
                    this.onRouteMatched();
                }, this);
            },

            onRouteMatched: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.getData().textData =
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                    + "At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                    + "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi."
                    + "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
                    + "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

                this.getView().setModel(oModel, "page");
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    aArtVisi: false,
                    tEndVisi: false,
                    tStartVisi: false,
                }), "filterModel");


                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    t1: true,
                    t2: true,
                    t3: true,
                    t4: true,
                    t5: false,
                    t6: false,
                    t7: false,
                    t8: false,
                    t9: false,
                }), "layoutModel");

                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    col1Text: "Eckstart",
                    col1Show: true,
                    col2Text: "Eckend",
                    col2Show: true,
                    col3Text: "Art",
                    col3Show: true,
                    col4Text: "Material",
                    col4Show: true,
                    col5Text: "Auftrag",
                    col5Show: true,
                    col6Text: "Sollmenge",
                    col6Show: true,
                    col7Text: "Verpackungstyp",
                    col7Show: true,
                    col8Text: "Kundenauftrag",
                    col8Show: true,
                }), "columnModel");
            },

            onSearch: function () {
                var aFilters = []
                var oFilterModel = this.getView().getModel("filterModel").getData();
                //construct filter
                if (oFilterModel.tStartVisi) {
                    aFilters.push(new sap.ui.model.Filter({
                        path: "Eckstart",
                        comparator: this.sfilterData,
                        operator: sap.ui.model.FilterOperator.BT,
                        value1: oFilterModel.tStartFrom,
                        value2: oFilterModel.tStartTo
                    }));
                }
                if (oFilterModel.tEndVisi) {
                    aFilters.push(new sap.ui.model.Filter({
                        path: "Eckend",
                        comparator: this.sfilterData,
                        operator: sap.ui.model.FilterOperator.BT,
                        value1: oFilterModel.tStartFrom,
                        value2: oFilterModel.tStartTo
                    }));
                }
                if (oFilterModel.aArtVisi) {
                    aFilters.push(new sap.ui.model.Filter("Art", sap.ui.model.FilterOperator.BT, oFilterModel.aArtFrom, oFilterModel.aArtTo))
                }
                var oFilter = new sap.ui.model.Filter({ filters: aFilters, and: true });
                //get Binding of Table 1
                var oBinding = this.byId("table1").getBinding("rows");
                oBinding.filter(oFilter);
            },

            sfilterData: function (value1, value2) {
                //parse string into correct format
                let d1, d2;
                d1 = value1.split(".")
                d2 = value2.split(".")
                value1 = d1[1] + "." + d1[0] + "." + d1[2]
                value2 = d2[1] + "." + d2[0] + "." + d2[2]

                return Date.parse(value1) - Date.parse(value2);
            },

            onSaveSettings: function () {
                // //store data in localstorage
                // var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                // oStore.put("filter", this.getView().getModel("filterModel").getData());
                // console.log(this.getView().getModel("filterModel").getData())

                //open Dialog
                if (!this.oSaveDialog) {
                    this.oSaveDialog = new sap.m.Dialog({
                        title: "Save Current Settings",
                        resizable: true,
                        draggable: true,
                        content: new sap.m.Input({ id: "inputNew", placeholder: "Name der Einstellung" }),
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Accept,
                            text: "Speichern",
                            press: function () {
                                this.oSaveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new sap.m.Button({
                            type: sap.m.ButtonType.Reject,
                            text: "Close",
                            press: function () {
                                this.oSaveDialog.close();
                            }.bind(this)
                        })
                    });

                    //to get access to the controller's model
                    this.getView().addDependent(this.oSaveDialog);
                }

                this.oSaveDialog.open();
            },

            onColumnPicker: function () {
                if (!this.oColumnDialog) {
                    this.oColumnDialog = new sap.m.SelectDialog({
                        title: "Spalten konfigurieren",
                        resizable: true,
                        draggable: true,
                        showClearButton: true,
                        multiSelect: true,
                        confirm: this.test,
                        items: [
                            new sap.m.StandardListItem({ title: "{columnModel>/col1Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col2Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col3Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col4Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col5Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col6Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col7Text}" }),
                            new sap.m.StandardListItem({ title: "{columnModel>/col8Text}" })
                        ]
                    });
                    //to get access to the controller's model
                    this.getView().addDependent(this.oColumnDialog);
                }

                this.oColumnDialog.open();
            },

            onOpenLayoutDialog: function () {
                if (!this.oLayoutDialog) {
                    this.oLayoutDialog = new sap.m.Dialog({
                        title: "Layout anpassen",
                        content: [
                            new sap.m.VBox({
                                items: [
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button({
                                text: "Close",
                                press: function () {
                                    this.oLayoutDialog.close()
                                }.bind(this)
                            })
                        ]
                    });

                    for (let i = 1; i < 10; i++) {
                        let label;
                        switch (i) {
                            case 1:
                                label = "Prozessauftrag Übersicht";
                                break;
                            case 2:
                                label = "Prozessauftrag Details";
                                break;
                            case 3:
                                label = "Prozessauftrag Vorgangsdetails & Stückliste zum Auftrag";
                                break;
                            case 4:
                                label = "Prozessauftrag Lieferdetails & Prozessauftrag Langtexte";
                                break;
                            case 5:
                                label = "Auftragscontrolling Aufträge"; 
                                break;
                            case 6:
                                label = "Auftragscontrolling Summen";
                                break;
                            case 7:
                                label = "Prozessauftrag / Kampagne Einarbeitungsmatrix";
                                break;
                            case 8:
                                label = "Stückliste zur Kampagne";
                                break;
                            case 9:
                                label = "Kampagnencontrolling";
                                break;
                        }


                        let box = new sap.m.CheckBox({
                            text: label,
                        });
                        box.bindProperty("selected", "layoutModel>/t" + i);
                        this.oLayoutDialog.getContent()[0].addItem(box);
                    }

                    //to get access to the controller's model
                    this.getView().addDependent(this.oLayoutDialog);
                }

                this.oLayoutDialog.open();
            }
        });
    }
);
