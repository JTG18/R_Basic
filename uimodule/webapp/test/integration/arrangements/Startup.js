sap.ui.define(
    ["sap/ui/test/Opa5"],
    /**
     * @param {typeof sap.ui.test.Opa5} Opa5
     */
    function (Opa5) {
        "use strict";

        return Opa5.extend("roehm.jt.mockup.mockup.test.integration.arrangements.Startup", {
            iStartMyApp: function () {
                this.iStartMyUIComponent({
                    componentConfig: {
                        name: "roehm.jt.mockup.mockup",
                        async: true,
                        manifest: true,
                    },
                });
            },
        });
    }
);
