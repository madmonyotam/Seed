module.exports = {
    "username": "AlertsSuperUser",
    "password": "AlertsSuperUser1!",
    "getFromDDM": {
        "prefix": "",
        "labelKeyFields": ["labelkey"],
        "defaultLabelFields": ["DefaultDisplayLabel", "defaultDisplayLabel", "defaultValue"],
    },
    "getFromMasterConfig": [{
        "path": ["client", "analyze", "sortFields"],
        "keyField": "label",
        "valueField": "label"
    },{
        "path": ["client", "entitiesMap"],
        "keyField": "textBeforeName",
        "valueField": "textBeforeName"
    },{
        "path": ["client", "entitiesMap"],
        "keyField": "label",
        "valueField": "label"
    },{
        "path": ["client", "analyze", "widgets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "dashboard", "widgets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "webprofile", "widgets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "target", "widgets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "case", "widgets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "leftmenu"],
        "keyField": "label_name",
        "valueField": "label_name"
    },{
        "path": ["client", "analyze", "case", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "case", "ui", "facets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "webProfile", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "webProfile", "ui", "facets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "target", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "case", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "webProfile", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "target", "ui"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "analyze", "target", "ui", "facets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "vla", "filters", "client", "links", "properties"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "vla", "filters", "expand", "filters"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "vla", "filters", "expand", "filters", "properties"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "vla", "filters", "client", "nodes", "filters", "properties"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "documentViewer", "facets"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "calendar", "sortFields"],
        "keyField": "title",
        "valueField": "title"
    },{
        "path": ["client", "reportTemplates"],
        "keyField": "title",
        "valueField": "title"
    }],
    // example object
    // {
    //     "path": ["path", "to", "config"],
    //     "keyField": "title",
    //     "valueField": "title"
    // }


    "manuals": {         
        "form.priority.urgent": "Urgent",
        "form.priority.high": "High",
        "form.priority.medium": "Medium",
        "form.priority.low": "Low",
    }
};