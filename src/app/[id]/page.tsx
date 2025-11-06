import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import axios from "axios";

const getData = async (id: String) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);

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
    const episodios: number  = response.episode.length;
    const tipo: String = response.type;

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold">
                        {id} - {nome}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-6">
                    <Avatar className="w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-primary">
                        <AvatarImage src={`${imagem}`}  width={200} height={200}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> 
                </CardContent>
                <CardFooter className="grid gap-1.5">
                    <p>
                        <span className="font-semibold">Informações Gerais:</span><br/>
                        {nome} esteve presente em {episodios} Ep;
                    </p>
                    <p>
                        <span className="font-semibold">Especie:</span> {especie};<br/>
                        <span className="font-semibold">Tipo:</span> {tipo};<br/>
                        <span className="font-semibold">Gênero:</span> {genero};
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Local de origem:</span> {origem};<br/>
                        <span className="font-semibold">Residencia atual:</span> {local};
                    </p>
                </CardFooter>
            </Card>
        </div>



    )

}




