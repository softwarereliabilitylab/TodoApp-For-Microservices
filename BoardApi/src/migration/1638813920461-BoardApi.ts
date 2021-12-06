import {MigrationInterface, QueryRunner} from "typeorm";

export class BoardApi1638813920461 implements MigrationInterface {
    name = 'BoardApi1638813920461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boarditem" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ip" character varying NOT NULL, "comment" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT '"2021-12-06T18:05:20.687Z"', CONSTRAINT "PK_fe2055ef9253a39d192dd2eb893" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "boarditem"`);
    }

}
