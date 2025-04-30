const express = require('express')
const cors = require('cors')
const { config } = require('dotenv')
config()
const getAudio = require('./Service/Audio_gen')
const generate_script = require('./Service/GenAI')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(cors())

const PORT = 8000
// here create a function that will take the text and return the audio file
// by using getaudio and generate_script function


async function main(title) {
    try {
        let content = `Generate a single-host podcast script on the topic '${title}'. Use an engaging and conversational tone. Add natural pauses using ellipses (...) to enhance delivery. The script must be plain text only and strictly under 900 characters. Do not include markdown, code, titles, links, audio, or video. Start directly with the host speaking.`
        const response = await generate_script(content)
        await getAudio(response, title)
        return { message: 'Audio generated successfully' }
    } catch (err) {
        console.error('Error generating audio:', err)
    }
}

// main(title)


app.get('/:title', async (req, res) => {
    const { title } = req.params;
    const data = await main(title)
    if (data) {
        const audio = path.join(__dirname, `${title}.wav`);
        res.sendFile(audio, async (err) => {
            if (err) {
                console.error('Error sending audio file:', err);
                return res.status(500).send('Error sending audio file');
            } else {
                console.log('Audio file sent successfully');
            }
        })
    } else {
        res.status(500).json({ message: 'Error generating audio' })
    }
})

app.get('/audio/:title', async (req, res) => {
    console.log("hitt")
    const { title } = req.params;
    const audio = path.join(__dirname, `${title}.wav`);
    res.sendFile(audio, async (err) => {
        if (err) {
            console.error('Error sending audio file:', err);
            return res.status(500).send('Error sending audio file');
        } else {
            console.log('Audio file sent successfully');
            // await fs.unlink(audio, (err) => {
            //     if (err) console.error('Failed to delete audio:', err);
            // })
        }
    })
})

app.listen(PORT, () => { console.log('app is running on Port', PORT) })