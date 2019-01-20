#  App Translate Service

Translates the client application using three sources:

1. source files - gathers `core.translate()` calls from all the source files.
2. values from the config - gathers keys and values from places in the master config (paths are specified in 'servers/translate/config.js')
3. manualy inserted key-value pairs - adds the `manuals` object in 'servers/translate/config.js' to the translation.

## Adding a new path of the master config to the translation

in 'servers/translate/config.js', under `getFromMasterConfig`, each path object looks like this:

```js
{
    "path": ["client", "entities"],
    "keyField": "name",
    "valueField": "title"
}
```

this will look at `MasterConfig.client.entities`, which can be an object or an array,
and gather the key (based on `keyField`) and value (based on `valueField`) from it's children.
for example if the masterConfig looks like this:

```js
{
    client: {
        entities: [{
            name: 'koko',
            title: 'loko'
        }]
    }
}
```
you will get a key called `koko` with a value of `loko`.

## Adding a new manual key-value

in 'servers/translate/config.js', under `manuals`, simply add a property:

```js
'someKey': 'someDefaultValue'
```

## Run translation

#### Single translation

to produce a single translation for Fusion run:
```
node run translate
```
this will create a file in 'FED-Fusion/servers/fusion/languages/en.json' with the result of the translation.

#### Merged translation

to produce a translation and merge it with existing translated files run:
```
node run translate -a
```
this will read all json files in 'servers/fusion/languages' and create for each of them a coresponding file with the same name
in 'servers/translate/output'. the new file will contain all produced translation keys and their values will be copied
from the old file (if they exist).

#### Stats

for debugging purposes, a stats folder may be created by passing the `--stats` or `-s` flags.
```
node run translate -s
```

this will produce a folder in `translate/stats` with some files with useful statistics about the current process.