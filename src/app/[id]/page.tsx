import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import axios from "axios";

const getData = async (id: String) => {
    const response = await axios.get(`"https://rickandmortyapi.com/api/character/${id}"`);

    return response.data;
};


export default async function saibaMais ({
    params,
}: { 
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await getData(id);
    const nome: String = response.name;
    const especie: String = response.species;
    const genero: String = response.gender;
    const origem: String = response.origin.name;
    const imagem: String = response.image;
    const local: String = response.location.name;
    const episodios: number  = response.espisode.length;
    const tipo: String = response.type;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {id} - {nome}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Avatar>
                        <AvatarImage srcSet={`"${imagem}"`} width={200} height={200}></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </CardContent>
                <CardFooter>
                    {nome} esteve presente em {episodios}<br/>
                    Especie: {especie} <br/>
                    Tipo: {tipo}<br/>
                    Gênero: {genero}<br/><br/>
                    Local de origem: {origem}<br/>
                    Residencia atual: {local}<br/>
                </CardFooter>
            </Card>
        </div>



    )

}




