import faker from 'faker';
import moment from 'moment';
import { isEmpty } from 'lodash';

module.exports = {
    name: "Generator",
    dependencies: [],

    get() {
        var core = this;

        function _create( params, clean ) {

            let count = params.count ? params.count : 10;
            let model = params.model ? params.model : defaultModel;

            let mockList = []

            for (let i = 0; i < count; i++) {
                mockList.push( modelator( model ) );
            }

            let mockObject = {
                results: mockList,
                totalHits: mockList.length
            }

            if (clean) {
              return mockList
            }

            return mockObject;
        };

        function getElementValue ( element ) {
            let eTp = element.type;
            if ( !types[eTp] ) return element.value;

            return types[eTp].generate(element);
        };

        function modelator ( model ) {
            let newData = {};

            for (const field in model) {
                const element = model[field];
                newData[field] = getElementValue( element );
            }

            return newData;
        };

        const defaultModel = {
            id: { type: 'id' },
            name: { type: 'fullName' }
        };

        function getCategories () {
          let cats = core.tree.get(["plugins", "access", "genie"]);
          let keys = Object.keys(cats);
          return keys
        };

        const types = {
            // References: 
            //      http://marak.github.io/faker.js/
            //      https://www.npmjs.com/package/faker
            //      https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html#random

            avatar: {
                info: "Random avatar image",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.image.avatar();
                }
            },
            arrayElement: {
                info: "Random element from a given array",
                scheme: {
                  type: 'array',
                  value: 'chip' 
                },
                generate: (element)=>{
                    return faker.random.arrayElement( element.value );
                }
            },
            arraySubArray: {
                info: "Random element from a given array as one item array",
                scheme: {
                    type: 'array',
                    value: 'chip' 
                },
                generate: (element)=>{
                    return [faker.random.arrayElement( element.value )];
                }
            },
            arrayEmpty: {
                info: 'Array without values',
                scheme: {
                  type: null,
                  value: null 
                },
                generate: (element)=>{
                    return [];
                }
            },
            boolean: {
                info: "Random boolean value",
                scheme: {
                    type: 'boolean',
                    value: null 
                },
                generate: (element)=>{
                    return faker.random.boolean();
                }
            },
            category: {
                info: "A single category object",
                scheme: {
                  type: 'autocomplete',
                  value: getCategories()
                },
                generate: (element)=>{
                    let newObject = {};

                    let dataFromFile = { ...core.tree.get(["plugins","Settings","config","genie"]) };
                    const item = dataFromFile[element.value];

                    for (const key in item) {
                        if (item[key].hasOwnProperty('type')) {
                            newObject[key] = getElementValue( item[key] );
                        } else {
                            newObject[key] = item[key]
                        }
                    }

                    return newObject;
                }
            },
            categoriesArray:{
                info: "An array of multi categories selected",
                scheme: {
                    type: 'autocompleteArray', // can select more than one categories
                    value: getCategories() 
                },
                generate: (element)=>{
                    let newArray = [];

                    element.value.forEach((el) => {
                        newArray.push( _create({count:1, model: core.mockGen(el)}, true ) );
                    });
                    
                    return newArray;
                }
            },
            categoryEmpty: {
                info: 'Empty object',
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return {};
                }
            },
            categoryList: {
                info: "A list of categories, count will be it's size",
                scheme: {
                    type: 'autocomplete',
                    value: getCategories(),
                    count: true
                },
                generate: (element)=>{
    
                    let count = element && element.count;
                    if ( !count || !element.value | isEmpty( element.value ) ) return null;
    
                    let list = [];
    
                    for (let i = 0; i < count; i++) {
                        let listObject = {}
                        let dataFromFile = { ...core.tree.get(["plugins","Settings","config","genie"]) };
                        const item = dataFromFile[element.value];

                        for (const key in item) {
                            if (item[key].hasOwnProperty('type')) {
                                listObject[key] = getElementValue( item[key] );
                            } else {
                                listObject[key] = item[key]
                            }
                        }
                        list.push( listObject );
                    }
                    return list;
                }
            },
            company: {
                info: "Random company name",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.company.companyName();
                }
            },
            color: {
                info: "Color hex code",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.color();
                }
            },
            country: {
                info: "Random country name",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.address.country();
                }
            },
            date: {
                info: "Today's date in a mask. ex. `DD-MM-YYYY`",
                scheme: {
                    type: 'text', // Not an required field
                    value: 'DD-MM-YYYY' // Not the date string, but a mask ex: DD-MM-YYYY
                },
                generate: (element)=>{
                    let {value} = element;
                    
                    let hasMask = value && value.length;
                    let valueMask = (hasMask) ? value : null;
                    
                    return moment().format(valueMask);
                }
            },
            dateBetween: {
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
                }
            },
            dateFuture: {
                info: "Returns a future date string based in a optional date mask",
                scheme: {
                    type: 'optionalString', // Not an required field
                    value: 'dateMask' // Not the date string, but a mask ex: DD-MM-YYYY
                },
                generate: (element)=>{
                    let dateformat = (element && element.value && element.value.trim().length ) ? element.value : null;
                    return moment(faker.date.future()).format(dateformat);
                }
            },
            datePast: {
                info: "Returns a past date string based in a optional date mask",
                scheme: {
                    type: 'optionalString', // Not an required field
                    value: 'dateMask' // Not the date string, but a mask ex: DD-MM-YYYY
                },
                generate: (element)=>{
                    let dateformat = (element && element.value && element.value.trim().length ) ? element.value : null;
                    return moment(faker.date.past( 50 )).format(dateformat);
                }
            },
            dateRange: {
                info: "Returns date range object between two given dates based in a optional date mask",
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
                }
            },
            domain: {
                info: "A random domain",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.domainName();
                }
            },
            email: {
                info:"Email address from 'example' domain",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.exampleEmail();
                }
            },
            false: {
                info:"false",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return false;
                }
            },
            fixedValue: {
                info: "Returns same given value",
                scheme: {
                    type: 'string',
                    value: 'fixedValue' 
                },
                generate: (element)=>{
                    return element.value;
                }
            },
            id: {
                info: "Random uuid code",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.random.uuid();
                }
            },
            image: {
                info:"Random image with optional given size. Ex: 640x480 ",
                scheme: {
                    type: 'string',
                    value: 'widthXheght'
                },
                generate: (element)=>{
                    let {value} = element;
                    let [w,h] = ( value && value.length ) ? value.split('x') : [null, null];
                    return faker.image.image(w,h);
                }
            },
            imageBusiness: {
                info:"Random business image with optional given size. Ex: 640x480 ",
                scheme: {
                    type: 'string',
                    value: 'widthXheght'
                },
                generate: (element)=>{
                    let {value} = element;
                    let [w,h] = ( value && value.length ) ? value.split('x') : [null, null];
                    return faker.image.business(w,h);
                }
            },
            ip: {
                info: "Ipv4 address",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.ip();
                }
            },
            ipv6: {
                info: "Ipv6 address",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.ipv6();
                }
            },
            jobTitle: {
                info: "Random job title",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.name.jobTitle();
                }
            },
            nameFirst: {
                info: "Random first name",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.name.firstName();
                }
            },
            nameFull: {
                info: "Random name and lastname",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return `${faker.name.firstName()} ${faker.name.lastName()}`;
                }
            },
            nameLast: {
                info: "Random lastname",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.name.lastName();
                }
            },
            number: {
                info: "Random number",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.random.number();
                }
            },
            nullValue: {
                info: "nullValue",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return null;
                }
            },
            numberMax: {
                info: "Random number with max value",
                scheme: {
                    type: 'number',
                    value: 'maxValue' 
                },
                generate: (element)=>{
                    let {value} = element;
                    return faker.random.number({max: value});
                }
            },
            numberMin: {
                info: "Random number starting from value",
                scheme: {
                    type: 'number',
                    value: 'minValue'
                },
                generate: (element)=>{
                    let {value} = element;
                    return faker.random.number({min: value});
                }
            },
            numberBetween: {
                info: "Random number starting at min, <= max. Ex: 'min:2,max:5' ",
                params: { value: 'string', example: "min: 2, max: 5" },
                scheme: {
                    type: 'numberRange',
                    value: {
                        min: "number",
                        max: "number",
                    }
                },
                generate: (element)=>{
                    let {value} = element;

                    let hasMin = value && value.min && value.min >= 0;
                    let hasMax = value && value.max && value.max > 0;

                    let min = (hasMin) ? value.min : 0;
                    let max = (hasMax) ? value.max : 10;

                    if ( max <= min ) max = min + 1;

                    return faker.random.number({min, max});
                }
            },
            numberZeroMax: {
                info: "Zero or a random number under max value",
                scheme: {
                    type: 'number',
                    value: 'numberMax'
                },
                generate: (element)=>{
                    let {value} = element;
                    let max = value || 10;

                    let getRadom = faker.random.boolean();
                    if ( getRadom )
                        return faker.random.number({min:1, max});

                    return 0;
                }
            },
            numberMask: {
                info:"Returns a number based on a mask using # for replace, ex: $#.###,##",
                scheme: {
                    type: 'string',
                    value: 'numberMask' // ex: $#.###,##
                },
                generate: (element)=>{
                    return faker.helpers.replaceSymbolWithNumber( value );
                }
            },
            paragraph: {
                info: "Random paragraph text with optional number of sentences",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    let {value} = element;
                    let sentences = ( value && value > 0 ) ? value : null;
                    return faker.lorem.paragraph( sentences );
                }
            },
            sentence: {
                info: "Sentence with specific number of words",
                scheme: {
                    type: 'number',
                    value: 'numberOfWords'
                },
                generate: (element)=>{
                    let {value} = element;
                    let words = ( value && value > 0 ) ? value : null;
                    return faker.lorem.sentence( words );
                }
            },
            textLines: {
                info: "Text with specific number of lines",
                scheme: {
                    type: 'number',
                    value: 'numberOfLines'
                },
                generate: (element)=>{
                    let {value} = element;
                    let lines = ( value && value > 0 ) ? value : null;
                    return faker.lorem.lines( lines );
                }
            },
            url: {
                info: "URL address",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.url();
                }
            },
            userName: {
                info: "User name",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.internet.userName();
                }
            },
            word: {
                info: "Single word",
                scheme: {
                    type: null,
                    value: null 
                },
                generate: (element)=>{
                    return faker.random.word();
                }
            },
        };

        return {
            getTypes() {
              return Object.keys(types);
            },

            getCategories(){
              return core.tree.get(["plugins","Settings","config","genie"])
            },

            getSchemes() {
                let schemes = Object.entries(types);
                    schemes = schemes.map( (item) => { 
                        return { 
                            type: item[0],
                            scheme: item[1].scheme
                        } 
                    });
                return schemes;
            },

            getTypeParams(){
                return {};
            },

            getTypeScheme( type ) {
              if ( types[type] && types[type].scheme ) return types[type].scheme;
              else return {};
            }, 

            getTypeInfo( type ) {
              if ( types[type] && types[type].info ) return types[type].info;
              else return undefined;
            },

            generate(type) {
              return types[type].generate();
            },

            getTypeValue( type ) {
              return types[type].func();
            },

            create (params, clean) { // params = { model, count }
              return _create(params, clean);
            }
        };
    }
}