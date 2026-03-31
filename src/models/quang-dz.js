import OpenAIApi from 'openai';
import { getKey } from '../utils/keys.js';
import { strictFormat } from '../utils/text.js';

export class QuangDZ {
    static prefix = 'quangdz';
    constructor(model_name, url, params) {
        this.model_name = model_name;
        this.params = params;
        this.url = url || 'https://quangdz.exe.xyz/v1';

        let config = {
            baseURL: this.url,
            apiKey: getKey('QUANGDZ_API_KEY')
        };

        this.openai = new OpenAIApi(config);
    }

    async sendRequest(turns, systemMessage, stop_seq='***') {
        let model = this.model_name || "newclaude-opus-4.6";
        let res = null;

        try {
            console.log('Awaiting QuangDZ api response from model', model);
            let messages = [{'role': 'system', 'content': systemMessage}].concat(turns);
            messages = strictFormat(messages);
            
            const pack = {
                model: model,
                messages,
                stop: stop_seq,
                ...(this.params || {})
            };

            let completion = await this.openai.chat.completions.create(pack);
            if (completion.choices[0].finish_reason == 'length')
                throw new Error('Context length exceeded'); 
            
            console.log('Received.');
            res = completion.choices[0].message.content;
        }
        catch (err) {
            if ((err.message == 'Context length exceeded' || err.code == 'context_length_exceeded') && turns.length > 1) {
                console.log('Context length exceeded, trying again with shorter context.');
                return await this.sendRequest(turns.slice(1), systemMessage, stop_seq);
            } else {
                console.log(err);
                res = 'My brain disconnected, try again.';
            }
        }
        return res;
    }

    async sendVisionRequest(messages, systemMessage, imageBuffer) {
        const imageMessages = [...messages];
        imageMessages.push({
            role: "user",
            content: [
                { type: "text", text: systemMessage },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
                    }
                }
            ]
        });
        
        return this.sendRequest(imageMessages, systemMessage);
    }

    async embed(text) {
        if (text.length > 8191)
            text = text.slice(0, 8191);
        const embedding = await this.openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
            encoding_format: "float",
        });
        return embedding.data[0].embedding;
    }
}
