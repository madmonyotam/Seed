import { uniq, isEmpty } from 'lodash';
module.exports = {
    name: "MockUIHelpers",
    dependencies: [],

    get() {
        var seed = this;
        var { ComponentMixin } = seed.imports;
        return {
            mixins: [ ComponentMixin ],

            libraryOpen( library ) {
                seed.plugins.Genie.set(['currentLibrary'], library);
            },

            categoryOpen( category ) {
                if(category){
                    seed.plugins.Genie.set(['currentCategory'], category);
                }
            },

            libraryRename( oldLabel, newLabel) {
                let data = ComponentMixin.serialize( seed.plugins.Genie.getMock() );
                let dataEntries = Object.entries( data ).sort();

                for (let i = 0; i < dataEntries.length; i++) {
                    const [indicator, values] = dataEntries[i];
                    const [entryLib, entryCat] = indicator.split(':');
                    const newIndicator = `${newLabel}:${entryCat}`;

                    data[indicator] = updateDynamicLists( values, oldLabel, newLabel );

                    if ( entryLib === oldLabel ) {
                        delete data[indicator];
                        data[newIndicator] = values;
                    }
                }
                seed.plugins.Genie.setMock(data);
            },

            libraryRemove( label ) {
                let data = ComponentMixin.serialize( seed.plugins.Genie.getMock() );
                let dataEntries = Object.entries( data ).sort();
                let libraries = uniq( dataEntries.map( e => e[0].split(':')[0] ) );

                let newLabel = getOtherLibName( libraries, label );

                for (let i = 0; i < dataEntries.length; i++) {
                    const [indicator, values] = dataEntries[i];
                    const entryLib = indicator.split(':')[0];

                    data[indicator] = updateDynamicLists( values, label, newLabel );

                    if ( entryLib === label ) delete data[indicator];
                }
                if ( !data || isEmpty(data) ) data = {};
                seed.plugins.Genie.setMock(data);
            },
            
        };

        function getOtherLibName( libs, label ) {
            for (let i = 0; i < libs.length; i++) {
                const libLabel = libs[i];
                if ( libLabel !== label ) return libLabel;
            }
            return 'noLibrary';
        };

        function updateDynamicLists( values, oldLabel, newLabel) {
            let newValues = {...values};
            let keys = Object.keys(values);
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                const vKey = values[k];

                if ( vKey.type !== 'dynamicList' ) continue;

                let [lib, cat] = vKey.value.split(':');

                let sameLib = lib === oldLabel;

                if ( sameLib ) {
                    let indicator = `${newLabel}:${cat}`
                    newValues[k].value = indicator;
                }
            }
            return newValues;
        };

    }
}
