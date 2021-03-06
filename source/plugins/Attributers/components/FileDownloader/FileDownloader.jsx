module.exports = {
dependencies: ['Attributers.Composer'],
get(Composer) {
    const core = this;
    const { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],
        
        propsTypes: {
            content: PropTypes.object.isRequired,
            fileExtension: PropTypes.string.isRequired,
            fileName: PropTypes.string,
            style: PropTypes.object,
            disabled: PropTypes.bool,
        },

        getDefaultProps(){
            return {
                disabled: false,
                fileName: 'file',
                decorator: true
            }
        },

        styles(s){
            let {style} = this.props;

            let styles = {
                root: {
                    ...style,
                },
            }

            return(styles[s]);
        },

        saveFile(e){
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            let { content, fileName, fileExtension } = this.props;
            let parsed = JSON.stringify(content, null, 4);
            let blob = new Blob([parsed], { type: 'octet/stream' });

            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            
            document.body.appendChild(a);
            
            a.href = url;
            a.download = fileName+'.'+fileExtension;

            setTimeout(() => {
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
        },

        createElement(child){
            let {onClick, disabled} = this.props;

            const click = (e) => {
                if (onClick) {
                    if (disabled) return onClick(e);
                    else {
                        this.saveFile(e);
                        return onClick(e);
                    }
                } else {
                    return (disabled) ? null : this.saveFile(e);
                }
            }

            return React.cloneElement(child, { style: child.props.style, onClick: click });
        },

        render() {
            let { children } = this.props;

            return (
                <Composer createElement={this.createElement}>
                    {children}
                </Composer>
            );
        }
    }
}}
