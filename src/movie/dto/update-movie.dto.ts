import { Contains, Equals, IsAlphanumeric, IsArray, IsBoolean, IsDate, IsDateString, IsDefined, IsDivisibleBy, IsEmpty, IsEnum, IsHexColor, IsIn, IsInt, IsLatLong, IsNegative, IsNotEmpty, IsNotIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength, NotContains, NotEquals, registerDecorator, Validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

enum MovieGenre {
    Fantasy = 'fantasy',
    Action = 'action'
}

@ValidatorConstraint()
class PasswordValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        // 비밀번호 길이는 4-8
        console.log('%c<ssong>    ::', 'color: rgba(0, 153, 0); font-size: 20px;', value.length > 4 && value.length < 8);
        return value.length > 4 && value.length < 8;
    };
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return '비밀번호의 길이는 4~8자여야 합니다. 입력된 비밀번호($value)'
    };
}

function IsPasswordValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: PasswordValidator
        })
    }
}
export class UpdateMovieDto {
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @IsNotEmpty()
    @IsOptional()
    genre?: string;

    // 옵셔널이다.
    // @IsOptional()

    // null || undefined 이면 안된다.
    // @IsDefined()

    // 파라미터와 같아야 한다.
    // @Equals('hello')

    // 파라미터와 같으면 안된다.
    // @NotEquals('hello')

    // null || undefined || '' 이어야한다.
    // @IsEmpty()

    // null || undefined || '' 이면 안된다.
    // @IsNotEmpty()

    // Array 를 파라미터로 받고, Array 안의 값에 속해야만 한다.
    // @IsIn(['action', 'fantasy'])

    // Array 를 파라미터로 받고, Array 안의 값에 속하면 안된다.
    // @IsNotIn(['action', 'fantasy'])

    // boolean 인가.
    // @IsBoolean()
    // string 인가.
    // @IsString()
    // number 인가.
    // @IsNumber()
    // 정수인가.
    // @IsInt()
    // Array 인가.
    // @IsArray()
    // 파라미터에 해당하는 enum 값인가.
    // @IsEnum(MovieGenre)

    // 시간값인가.
    // "YYYY-MM-DDT12:00:00.000Z"
    // ex) "2024-09-16T18:30:00.000Z" (Z 는 UTC 시간을 의미한다.)
    // @IsDateString()

    // 파라미터로 나눌 수 있는 값인가.
    // @IsDivisibleBy(5)

    // 양수인가.
    // @IsPositive()
    // 음수인가.
    // @IsNegative()

    // 파라미터가 최소값이다.
    // @Min(100)
    // 파라미터가 최대값이다.
    // @Max(100)

    // 파라미터를 포함해야한다
    // @Contains('test')
    // 파라미터를 포함하면 안된다.
    // @NotContains('test')

    // 알파벳과 숫자로 이루어져 있는가.
    // 한글, 공백 등등 다 안됨.
    // @IsAlphanumeric()

    // 16진수의 컬러타입인가.
    // @IsHexColor()

    // 파라미터가 최대길이이다.
    // @MaxLength(20)
    // 파라미터가 최소길이이다.
    // @MinLength(20)

    // uuid 타입인가.
    // @IsUUID()

    // 위도, 경도값인가.
    // @IsLatLong()

    @IsNotEmpty()
    @IsPasswordValid({
        message: '다른 메세지도 가능'
    })
    test: string;
}