'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type CharactersProps = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  url: string;
};

export default function Inicio () {

  const[data, setData] = useState<CharactersProps[]>([]);
     
  useEffect(() => {
    const controller = new AbortController();
     const handleFetch = async () => {
      try{
        const response = await axios.get('https://rickandmortyapi.com/api/character',
        {signal: controller.signal}
        );
        setData(response.data.results);
        
      } catch(error) {
        console.log("Erro...")
      }
      };
    handleFetch();
     
      return () => {
        console.log("Cancelando...");
        controller.abort();
      };
  }, []);
  
  return (
    <div className="container mx-auto p-4">
    
       <div className="mb-6 flex justify-center">
         <Input type="search" placeholder="Procurar" className="w-full max-w-lg"></Input>
      </div>
      {data.map((parametro) => (
        <div key={parametro.id} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle>
                  <h2>{parametro.name}</h2>
                </CardTitle>
              <CardDescription>
                Esse é {parametro.name} seus status atuais são. {parametro.status}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Avatar>
                <AvatarImage src={parametro.image}  width={100} height={100}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>            
            </CardContent>

            <div className="p-6 pt-0">
               <Button className="w-full">Favoritar</Button>

                <Button asChild variant="outline" className="w-full mt-2">
                  <Link href={`${parametro.id}`}>Ver Mais</Link>
                </Button> 
            </div>

          </Card>
        </div>
      ))}     
    </div>
  )


}