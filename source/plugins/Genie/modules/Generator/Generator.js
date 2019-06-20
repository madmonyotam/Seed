import faker from 'faker';
import moment from 'moment';
import { isEmpty } from 'lodash';

/** TYPES
 *    number
 *    string
 *    numberRange
 *    dateRange
 *    autocomplete
 *    autocompleteArray
 *    boolean
 *    array
 */

module.exports = {
    dependencies: [],

    get() {
        var seed = this;

        const defaultModel = {
            id: { type: 'id' },
            name: { type: 'fullName' }
        };

        const staticDataAndArraysTypes = {
            false : {
                info:"false",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return false;
                },
                group: 'dataAndArrays',
            },
            fixedValue : {
                info: "Returns same given value",
                scheme: {
                    type: 'string',
                    placeholder: seed.translate('fixedValue') 
                },
                generate: (element)=>{
                    return element.value;
                },
                group: 'dataAndArrays',
            },
            id : {
                info: "Random uuid code",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.random.uuid();
                },
                group: 'dataAndArrays',
            },
            nullValue : {
                info: "nullValue",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return null;
                },
                group: 'dataAndArrays',
            },
            arrayEmpty : {
                info: 'Array without values',
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return [];
                },
                group: 'dataAndArrays',
            },
            boolean : {
                info: "Random boolean value",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.random.boolean();
                },
                group: 'dataAndArrays',
            },
            arrayElement : {
                info: "Random element from a given array",
                scheme: {
                    type: 'array',
                    placeholder: seed.translate('enter multiplay values')
                },
                generate: (element)=>{
                    return faker.random.arrayElement( element.value );
                },
                group: 'dataAndArrays',
            },
            arraySubArray : {
                info: "Random element from a given array as one item array",
                scheme: {
                    type: 'array',
                    placeholder: seed.translate('enter multiplay values')
                },
                generate: (element)=>{
                    return [faker.random.arrayElement( element.value )];
                },
                group: 'dataAndArrays',
            },
            categoryEmpty : {
                info: 'Empty object',
                scheme: {
                    type: null, 
                },
                generate: (element)=>{
                    return {};
                },
                group: 'dataAndArrays',
            },
        };

        const staticNameTypes = {
            nameFirst : {
                info: "Random first name",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.name.firstName();
                },
                group: 'names',
            },
            nameFull : {
                info: "Random name and lastname",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return `${faker.name.firstName()} ${faker.name.lastName()}`;
                },
                group: 'names',
            },
            nameLast : {
                info: "Random lastname",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.name.lastName();
                },
                group: 'names',
            },
        };

        const staticWebTypes = {
            userName : {
                info: "User name",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.userName();
                },
                group: 'web',
            },
            url : {
                info: "URL address",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.url();
                },
                group: 'web',
            },
            ip : {
                info: "Ipv4 address",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.ip();
                },
                group: 'web',
            },
            ipv6 : {
                info: "Ipv6 address",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.ipv6();
                },
                group: 'web',
            },
            domain : {
                info: "A random domain",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.domainName();
                },
                group: 'web',
            },
            email : {
                info:"Email address from 'example' domain",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.exampleEmail();
                },
                group: 'web',
            },
        };

        const staticTimeTypes = {
            date : {
                info: "Today's date in a mask. ex. `DD-MM-YYYY`",
                scheme: {
                    type: 'string',
                    placeholder: 'DD-MM-YYYY' 
                },
                generate: (element)=>{
                    let {value} = element;
                    
                    let hasMask = value && value.length;
                    let valueMask = (hasMask) ? value : null;
                    
                    return moment().format(valueMask);
                },
                group: 'time',
            },
            dateBetween : {
                info: "Returns date between two given dates based in a optional date mask",
                scheme: {
                    type: 'dateRange',
                    value: {          
                        from: "dateString",
                        to: "dateString",
                        mask: 'dateMask'
                    }
                },
                generate: (element)=>{
                    let {value} = element;

                    let hasFrom = value && value.from && value.from.length;
                    let hasTo   = value && value.to   && value.to.length;
                    let hasMask = value && value.mask && value.mask.length;

                    let valueFrom = (hasFrom) ? value.from : null;
                    let valueTo   = (hasTo)   ? value.to   : null;
                    let valueMask = (hasMask) ? value.mask : null;

                    return moment(faker.date.between( valueFrom, valueTo )).format(valueMask);
                },
                group: 'time',
            },
            dateFuture : {
                info: "Returns a future date string based in a optional date mask",
                scheme: {
                    type: 'dateMask', // Not an required field
                    placeholder: 'DD-MM-YYYY',
                },
                generate: (element)=>{
                    let dateformat = (element && element.value && element.value.trim().length ) ? element.value : null;
                    return moment(faker.date.future()).format(dateformat);
                },
                group: 'time',
            },
            datePast : {
                info: "Returns a past date string based in a optional date mask",
                scheme: {
                    type: 'dateMask', // Not an required field
                    placeholder: 'DD-MM-YYYY',
                },
                generate: (element)=>{
                    let dateformat = (element && element.value && element.value.trim().length ) ? element.value : null;
                    return moment(faker.date.past( 50 )).format(dateformat);
                },
                group: 'time',
            },
            dateRange : {
                info: "Returns date range object between two given dates based in a optional date mask",
                scheme: {
                    type: 'dateRange',
                    value: {
                        from: "dateString",
                        to: "dateString",
                        mask: 'dateMask',
                    }
                },
                generate: (element)=>{
                    let {value} = element;

                    let hasFrom = value && value.from && value.from.length;
                    let hasTo   = value && value.to   && value.to.length;
                    let hasMask = value && value.mask && value.mask.length;

                    let valueFrom = (hasFrom) ? value.from : null;
                    let valueTo   = (hasTo)   ? value.to   : null;
                    let valueMask = (hasMask) ? value.mask : null;

                    let dateOne = moment(faker.date.between( valueFrom, valueTo ));
                    let dateTwo = moment(faker.date.between( valueFrom, valueTo ));
                    
                    let from, to;

                    if ( dateOne.isBefore( dateTwo ) ) {
                        from = dateOne;
                        to = dateTwo;
                    } else {
                        from = dateTwo;
                        to = dateOne;
                    }

                    return { from: from.format(valueMask), to: to.format(valueMask) }
                },
                group: 'time',
            },
        };

        const staticTextTypes = {
            word : {
                info: "Single word",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.random.word();
                },
                group: 'text',
            },
            sentence : {
                info: "Sentence with specific number of words",
                scheme: {
                    type: 'number',
                    placeholder: seed.translate('number of words')                      
                },
                generate: (element)=>{
                    let {value} = element;
                    let words = ( value && value > 0 ) ? value : null;
                    return faker.lorem.sentence( words );
                },
                group: 'text',
            },
            textLines : {
                info: "Text with specific number of lines",
                scheme: {
                    type: 'number',
                    placeholder: seed.translate('number of lines')
                },
                generate: (element)=>{
                    let {value} = element;
                    let lines = ( value && value > 0 ) ? value : null;
                    return faker.lorem.lines( lines );
                },
                group: 'text',
            },
            paragraph : {
                info: "Random paragraph text with optional number of sentences",
                scheme: {
                    type: null 
                },
                generate: (element)=>{
                    let {value} = element;
                    let sentences = ( value && value > 0 ) ? value : null;
                    return faker.lorem.paragraph( sentences );
                },
                group: 'text',
            }
        };

        const staticNumberTypes = {
            number : {
                info: "Random number",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.random.number();
                },
                group: 'number',
            },
            numberMax : {
                info: "Random number with max value",
                scheme: {
                    type: 'number',
                    placeholder: seed.translate('max')  
                },
                generate: (element)=>{
                    let {value} = element;
                    return faker.random.number({max: value});
                },
                group: 'number',
            },
            numberMin : {
                info: "Random number starting from value",
                scheme: {
                    type: 'number',
                    placeholder: seed.translate('min')  
                },
                generate: (element)=>{
                    let {value} = element;
                    return faker.random.number({min: value});
                },
                group: 'number',
            },
            numberBetween : {
                info: "Random number starting at min, <= max. Ex: 'min:2,max:5' ",
                scheme: {
                    type: 'numberRange',
                    value: {
                        min: {
                            type: 'number',
                            placeholder: seed.translate('min') 
                        },
                        max: {
                            type: 'number',
                            placeholder: seed.translate('max') 
                        }
                    }
                },
                generate: (element)=>{
                    let {value} = element;

                    let hasMin = value && value.min && value.min >= 0;
                    let hasMax = value && value.max && value.max > 0;

                    let min = (hasMin) ? value.min : 0;
                    let max = (hasMax) ? value.max : 10;

                    min = Number(min);
                    max = Number(max);

                    if ( max <= min ) max = min + 1;

                    return Math.floor(Math.random() * (max-min+1) ) + Number(min);
                },
                group: 'number',
            },

            numberZeroMax : {
                info: "Zero or a random number under max value",
                scheme: {
                    type: 'number',
                    placeholder: seed.translate('max')  
                },
                generate: (element)=>{
                    let {value} = element;
                    let max = value || 10;

                    let getRadom = faker.random.boolean();
                    if ( getRadom )
                        return faker.random.number({min:1, max});

                    return 0;
                },
                group: 'number',
            },
            numberMask : {
                info:"Returns a number based on a mask using # for replace, ex: $#.###,##",
                scheme: {
                    type: 'numberMask',
                    placeholder: seed.translate('$#.###,##')  
                },
                generate: (element)=>{
                    return faker.helpers.replaceSymbolWithNumber( value );
                },
                group: 'number',
            },
        };
        
        const staticMediaTypes = {
            avatar : {
                info: "Random avatar image",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.image.avatar();
                },
                group: 'media',
            },
            image : {
                info:"Random image with optional given size. Ex: 640x480 ",
                scheme: {
                    type: 'string',
                    placeholder: seed.translate('size: 640x480') 
                },
                generate: (element)=>{
                    let {value} = element;
                    let [w,h] = ( value && value.length ) ? value.split('x') : [null, null];
                    return faker.image.image(w,h);
                },
                group: 'media',
            },
            imageBusiness : {
                info:"Random business image with optional given size. Ex: 640x480 ",
                scheme: {
                    type: 'string',
                    placeholder: seed.translate('size: 640x480') 
                },
                generate: (element)=>{
                    let {value} = element;
                    let [w,h] = ( value && value.length ) ? value.split('x') : [null, null];
                    return faker.image.business(w,h);
                },
                group: 'media',
            },
            color : {
                info: "Color hex code",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.internet.color();
                },
                group: 'media',
            },
        };

        const staticWorkTypes = {
            company : {
                info: "Random company name",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.company.companyName();
                },
                group: 'work',
            },
            jobTitle : {
                info: "Random job title",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.name.jobTitle();
                },
                group: 'work',
            },
        };

        const staticLocationTypes = {
            country : {
                info: "Random country name",
                scheme: {
                    type: null
                },
                generate: (element)=>{
                    return faker.address.country();
                },
                group: 'location',
            },
        };

        return {
            createTypes(){
                const category = {
                    info: "A single category object",
                    scheme: {
                        type: 'autocomplete',
                        options: this.getCategoriesKeys(),
                        placeholder: seed.translate('choose category from list')
                    },
                    generate: (element)=>{
                        let newObject = {};
                        let mock = seed.plugins.access.get('genie');
    
                        const item = mock[element.value];
    
                        for (const key in item) {
                            if (item[key].hasOwnProperty('type')) {
                                newObject[key] = this.getElementValue( item[key] );
                            } else {
                                newObject[key] = item[key]
                            }
                        }
    
                        return newObject;
                    },
                    group: 'custom',
                }

                const categoriesArray = {
                    info: "An array of multi categories selected",
                    scheme: {
                        type: 'autocompleteArray',
                        options: this.getCategoriesKeys(),
                        placeholder: seed.translate('choose categories from list') 
                    },
                    generate: (element)=>{
                        let newArray = [];
    
                        element.value.forEach((el) => {
                            newArray.push( this.create({count:1, model: seed.get('genie', el)}, true )[0] );
                        });
                        
                        return newArray;
                    },
                    group: 'custom',
                }

                const oneOfCategories = {
                    info: "one category from categories list",
                    scheme: {
                        type: 'autocompleteArray',
                        options: this.getCategoriesKeys(),
                        placeholder: seed.translate('choose categories from list') 
                    },
                    generate: (element)=>{
                        let length =  element.value.length;
                        let index = Math.floor(Math.random() * length); 
                        let item = this.create({count:1, model: seed.get('genie', element.value[index])}, true )

                        return item;
                    },
                    group: 'custom',
                }

                const categoryList = {
                    info: "A list of categories, count will be it's size",
                    scheme: {
                        type: 'autocomplete',
                        options: this.getCategoriesKeys(),
                        placeholder: seed.translate('choose category from list'),
                        count: true
                    },
                    generate: (element)=>{
                        let count = element && element.count;
                        if ( !count || !element.value | isEmpty( element.value ) ) return null;

                        let list = [];

                        for (let i = 0; i < count; i++) {
                            let listObject = {}
                            let dataFromFile = seed.plugins.access.get('genie');
                            const item = dataFromFile[element.value];

                            for (const key in item) {
                                listObject[key] = (item[key].hasOwnProperty('type')) ? this.getElementValue(item[key]) : item[key];
                            }

                            list.push( listObject );
                        }
                        return list;
                    },
                    group: 'custom',
                }

                const types = {
                    ...staticDataAndArraysTypes,
                    ...staticLocationTypes,
                    ...staticMediaTypes,
                    ...staticNameTypes,
                    ...staticNumberTypes,
                    ...staticTextTypes,
                    ...staticTimeTypes,
                    ...staticWebTypes,
                    ...staticWorkTypes,
                    category,
                    categoriesArray,
                    oneOfCategories,
                    categoryList,
                }
                return types;
            },

            types(params) {
                // References: 
                //      http://marak.github.io/faker.js/
                //      https://www.npmjs.com/package/faker
                //      https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html#random

                const action = (params && params.action) ? params.action : 'default';
                const type = (params && params.type) ? params.type : '';

                const types = this.createTypes()

                switch (action) {
                    case 'getTypes': {
                        return Object.keys(types);
                    }
                    case 'getSchemes': {
                        let schemes = Object.entries(types);
                        return schemes.map( (item) => { return { type: item[0], scheme: item[1].scheme } });
                    }
                    case 'getTypeScheme': {
                        return ( types[type] && types[type].scheme ) ? types[type].scheme : {};
                    }
                    case 'getTypeInfo': {
                        return ( types[type] && types[type].info ) ? types[type].info : undefined;
                    }
                    case 'getTypeGroup': {
                        return ( types[type] && types[type].group ) ? types[type].group : undefined;
                    }
                    case 'generate': {
                        return types[type].generate();
                    }
                    default:
                        return types;
                }
            },

            getAvatar(){

            },

            getTypes() {
              return this.types({action: 'getTypes'});
            },

            getTypeGroup( type ) {
              return this.types({action: 'getTypeGroup', type: type});
            },

            getGroups() {
                return [
                    'dataAndArrays',
                    'names',
                    'web',
                    'time',
                    'text',
                    'number',
                    'media',
                    'work',
                    'location',
                    'custom',
                ]
            },

            getCategories(){
                return seed.plugins.access.get('genie');
            },

            getSchemes() {
                return this.types({action: 'getSchemes'});
            },

            getTypeScheme( type ) {
                return this.types({action: 'getTypeScheme', type: type});
            }, 

            getTypeInfo( type ) {
                return this.types({action: 'getTypeInfo', type: type});
            },

            generate(type) {
                return this.types({action: 'generate', type: type});
            },

            getCategoriesKeys() {
                let cats = seed.plugins.access.get('genie');
                let keys = Object.keys(cats);
                return keys
            },

            getElementValue ( element ) {
                let eTp = element.type;
                let types = this.types();
                if ( !types[eTp] ) return element.value;

                return types[eTp].generate(element);
            },

            modelator ( model ) {
                let newData = {};

                for (const field in model) {
                    const element = model[field];
                    newData[field] = this.getElementValue( element );
                }

                return newData;
            },

            create (params, clean) { // params = { model, count }
                let count = params.count ? params.count : 10;
                let model = params.model ? params.model : defaultModel;

                let mockList = []

                for (let i = 0; i < count; i++) {
                    mockList.push( this.modelator( model ) );
                }

                let mockObject = {
                    results: mockList,
                    totalHits: mockList.length
                }

                if (clean) {
                return mockList
                }

                return mockObject;
            }
        };
    }
}