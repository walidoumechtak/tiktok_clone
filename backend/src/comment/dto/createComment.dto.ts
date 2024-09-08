import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateCommentDto {
    @Field()
    text: string;

    @Field()
    userId: number;

    @Field()
    postId: number;
}