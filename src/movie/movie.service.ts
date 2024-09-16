import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

export interface Movie {
    id: number;
    title: string;
    genre: string;
}

@Injectable()
export class MovieService {

    private movies : Movie[] = [
        {
            id: 1,
            title: '해리포터',
            genre: 'fantasy',
        },
        {
            id: 2,
            title: '반지의 제왕',
            genre: 'action',
        },
    ];

    private idCounter = 3;

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
            ...createMovieDto
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
