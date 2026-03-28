import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Redirect, Query, Ip, Req} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Observable, of, map } from 'rxjs';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {} 

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
        case "2":
          return {url: "https://www.youtube.com/watch?v=RuI96FlFU54"}
        case "3":
          return {url: "https://www.youtube.com/watch?v=40lGUYTR8qQ"}
        default:
          return {url: "https://www.youtube.com/watch?v=nMID48IluOU"}
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
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&ongitude=13.41&current=temperature_2m")
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
  async postus(@Body() createCatDto: CreateCatDto) {
    const data = await createCatDto
    const res = {...data, date: Date.now()}
    return res
  };

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get("findAll")
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
