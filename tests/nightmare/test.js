const Nightmare = require('nightmare');

describe('Todo app', function () {
    // this.timeout('5s')

    let browser = null;

    beforeEach(() => {
        browser = new Nightmare({ show: false });
    })

    it('hides list and footer by default', async () => {
        let page = browser
            .goto('http://localhost:3000')

        let listVisible = await page.exists('#main')
        let footerVisible = await page.exists('#footer')

        expect(listVisible).toBeFalsy()
        expect(footerVisible).toBeFalsy()

        await page.end()

    })

    it('creates new todos', async () => {
        const page =  browser.goto('http://localhost:3000')
            .click('input.new-todo:nth-child(2)')
            .insert('input.new-todo:nth-child(2)', 'Buy milk')
            .type('input.new-todo:nth-child(2)', '\u000d')
        const inputText = await page.evaluate(() => document.querySelector('input.new-todo').value)

        expect(inputText).toBe('')

        page.end()
            .catch(error => console.error(error))
            // .then(done, error => console.error(error))
    })

    it('completes todos', async () => {
        const page = browser.goto('http://localhost:3000')
            .click('input.new-todo:nth-child(2)')
            .insert('input.new-todo:nth-child(2)', 'Buy milk')
            .type('input.new-todo:nth-child(2)', '\u000d')
            .click('ul.todo-list li:nth-child(1) input.toggle')

        const itemCompleted = await page.evaluate(() => {
            return document.querySelector('ul.todo-list li:nth-child(1)').classList.contains('completed')
        })

        expect(itemCompleted).toBeTruthy()

        await page.end()
    })

});