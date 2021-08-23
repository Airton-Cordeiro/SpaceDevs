import { DateTime } from 'luxon'
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()


class ControllerListar {
    async listar (req, res){
        
        const config = {
            method: "GET",
            url: process.env.URL
        };
        try {
            var { data } = await axios(config);
        } catch (error) {
            console.log("Error: ",error)
        }
          
        var dados = []
        for (let i = 0; i < data.results.length; i++){

        let date = data.results[i]
        
        let d1 = DateTime.fromISO(date.window_start)
        let d2 = DateTime.fromISO("2022-02-23")//ultima data para retornar lançamento
            
        if(d1 <= d2 ){

            if( date.mission != null ){
                let launch = {
                    name: date.mission.name,
                    description: date.mission.description,
                    from: date.pad.location.name,
                    to: date.mission.orbit.name,
                    window_start: DateTime.fromISO(date.window_start)
                                            .setLocale('pt')
                                            .toFormat('dd/LL/yyyy')
                }
  
                dados.push(launch)
                }
            }
        }
        let lancamentos = {
            launches: dados
        }

        return res.status(200).json(lancamentos)
    }
}

export default new ControllerListar;