const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const text = require('./const')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}`))
bot.help((ctx) => ctx.reply(text.comman))

//функции асинхронные потому что кнопки могут выводится непоследовательно
bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('JS', 'btn_2')],
                [Markup.button.callback('Обзоры', 'btn_3'), Markup.button.callback('HTML', 'btn_4')]
            ]
        ))
    } catch (error) {
        console.log(error)
    }
   
})

function addActionBot(name, src, text){
    bot.action(name, async (ctx) => {
    try {
        await ctx.answerCbQuery()   // что бы кнопка которую обрабатываем перестала крутиться
        if(src){
            await ctx.replyWithPhoto({
                source:src
            })
        }
        await ctx.replyWithHTML(text, {
            disable_web_page_preview: true,   //что бы не отправлялась картинка-превью с сылкой
        })
    } catch (error) {
        console.error(error)
    }
})
}

addActionBot('btn_1', './img/01.jpg', text.text1)
addActionBot('btn_2', './img/02.jpg', text.text2)
addActionBot('btn_3', './img/03.jpg', text.text3)
addActionBot('btn_4', false, text.text4)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))