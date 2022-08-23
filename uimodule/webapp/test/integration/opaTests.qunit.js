/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["roehm/jt/mockup/mockup/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
