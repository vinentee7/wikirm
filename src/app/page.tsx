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
    <div>
    
       <div>
         <Input type="search" placeholder="Procurar"></Input>
      </div>
      {data.map((parametro) => (
        <div key={parametro.id}>
          <Card>
            <CardHeader className="border-blue-700">
                <CardTitle>
                  <h2>{parametro.name}</h2>
                </CardTitle>
              <CardDescription>
                Esse é {parametro.name} seus status atuais são. {parametro.status}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Avatar>
                <AvatarImage src={parametro.image}  width={100} height={100}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>            
            </CardContent>
               <Button>Favoritar</Button>

                <Button asChild variant="outline">
                  <Link href={`${parametro.id}`}>Ver Mais</Link>
                </Button> 
          </Card>
        </div>
      ))}     
    </div>
  )


}