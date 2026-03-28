import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Headers, Redirect, Query } from '@nestjs/common';
import { Observable, of, map } from 'rxjs';
import { Dog } from './entities/dog.entity';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
 
  @Get("breed")
  findBreed():string {
    return "nkuu"
  };

  @Get("test")
  findTestWith(@Headers() headers: string) {
    return {
      message: "result of the request to retrieve the headers component",
      headers: headers
    }
  };

  @Get("concrete")
  findConcreteComponentFromHeaders(@Headers("host") host:string, @Headers("connection") connection:string)
  {
    return{
      message: "here is the particluar parametrs of header the headers",
      connection: connection,
      host:host
    }
  };

  @Get("host")
  getHostName(@Headers("host") host:string){
    return { host:host }
  };

  @Get('docs')
  @Redirect("https://www.youtube.com")
  redirectToyoutube(@Query("version") version:string) {
      switch(version){
        case "1":
          return {url: "https://www.youtube.com/watch?v=AekTXgmpupI"}
          break
        case "2":
          return {url: "https://www.youtube.com/watch?v=RuI96FlFU54"}
          break
        case "3":
          return {url: "https://www.youtube.com/watch?v=40lGUYTR8qQ"}
          break
        default:
          return {url: "https://www.youtube.com/watch?v=nMID48IluOU"}
          break
      }
  };

  // @Get(':id')
  // findOut(@Param() params:any) {
  //   return {
  //     message:params.id
  //   }
  // }

  @Get('promises')
  async promis():Promise<any[]> {
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52%longitude=13.41&current=temperature_2m")
    const res = data.json()
    return res
  };

  @Get("observ")
  getData(): Observable<any> {
    return of({ message: 'Hello'}).pipe(
      map(v=>({...v,date: Date.now()})),
      map(v=>({...v,server:"server"})),
      map(v=>({...v,help:"help"}))
    );
  };

  @Post("postus")
  async postus(@Body() createDogDto: CreateDogDto) {
    const data = await createDogDto
    const res = {...data, date: Date.now()}
    return res
  };

  @Post()
    async create(@Body() createDogDto: CreateDogDto) {
      this.dogsService.create(createDogDto);
    }
  
    @Get("findAll")
    async findAll(): Promise<Dog[]> {
      return this.dogsService.findAll();
    }

}
