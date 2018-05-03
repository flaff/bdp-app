const
    XCODE = {
        COMMENT_COLOR: '#006a00',
        KEYWORD: '#aa0d91',
        VARIABLE: '#666600',
        STRING: '#c41a16',
        LINK: '#008800',
        SYMBOL: '#1c00cf',
        PARAMS: '#5c2699',
        ADDITION: '#baeeba',
        DELETION: '#ffc8bd'
    },

    c = (stringColor: string) => stringColor.replace('#', '');

const xcodeTheme: any /* monaco.editor.IStandaloneThemeData */ = {
    base: 'vs',
    inherit: true,
    rules: [
        {token: 'comment', foreground: c(XCODE.COMMENT_COLOR)},
        {token: 'keyword', foreground: c(XCODE.KEYWORD)},
        {token: 'string', foreground: c(XCODE.STRING)},
        {token: 'number', foreground: c(XCODE.SYMBOL)}
    ]
};

export const defineXCodeTheme = (defineTheme: (name: string, config: any) => void) =>
    defineTheme('xcode', xcodeTheme);