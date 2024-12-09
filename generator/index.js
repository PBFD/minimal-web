export default function (plop) {
    // pages generator
    plop.setGenerator('pages', {
        descriptions: 'Generate page html',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'page name please',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../{{ kebabCase name }}.html',
                templateFile: './templates/page.hbs',
            },
        ],
    })
}
