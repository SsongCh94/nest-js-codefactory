import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {

    private movies : Movie[] = [];

    private idCounter = 3;

    constructor(){
        const movie1 = new Movie();

        movie1.id = 1;
        movie1.title = '해리포터';
        movie1.genre = 'fantasy';

        const movie2 = new Movie();
        
        movie2.id = 2;
        movie2.title = '반지의 제왕';
        movie2.genre = 'action';

        this.movies.push(movie1, movie2)
    }

    getManyMovies(title?: string){
        
        if (!title) {
            return this.movies;
        }

        return this.movies.filter(m => m.title.startsWith(title));
    }

    getMovieById(id: number) {
        const movie = this.movies.find(i => i.id === +id);

        if (!movie) {
            throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
        }

        return movie;
    }

    createMovie(createMovieDto : CreateMovieDto) {
        const movie: Movie = {
            id: this.idCounter++,
            ...createMovieDto,
        }

        this.movies.push(movie);

        return movie;
    }

    updateMovie(id : number, updateMovieDto : UpdateMovieDto) {
        const targetMovie = this.movies.find(i => i.id === id);

        console.log('%c<ssong> targetMovie   ::', 'color: rgba(0, 153, 0); font-size: 20px;', targetMovie);

        if (!targetMovie) {
            throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
        }

        Object.assign(targetMovie, updateMovieDto);

        return targetMovie
    }

    deleteMovie(id : number) {
        const targetMovieIndex = this.movies.findIndex(i => i.id === +id);

        if (targetMovieIndex === -1) {
            throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
        }

        this.movies.splice(targetMovieIndex, 1)

        return id;
    }
}
