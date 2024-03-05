import { KeyAlgorithm, SigningKey } from '@activepieces/ee-shared'
import { EntitySchema } from 'typeorm'
import {
    ApIdSchema,
    BaseColumnSchemaPart,
} from '../../database/database-common'
import { Platform, User } from '@activepieces/shared'

type SigningKeySchema = SigningKey & {
    platform: Platform
    generator: User
}

export const SigningKeyEntity = new EntitySchema<SigningKeySchema>({
    name: 'signing_key',
    columns: {
        ...BaseColumnSchemaPart,
        displayName: {
            type: String,
            nullable: false,
        },
        platformId: {
            ...ApIdSchema,
            nullable: false,
        },
        publicKey: {
            type: String,
            nullable: false,
        },
        algorithm: {
            type: String,
            enum: KeyAlgorithm,
            nullable: false,
        },
        generatedBy: {
            ...ApIdSchema,
            nullable: true,
        },
        generatedByEmail: {
            type: String,
            length: 500,
            nullable: false,
        },
    },
    indices: [],
    relations: {
        platform: {
            type: 'many-to-one',
            target: 'platform',
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            joinColumn: {
                name: 'platformId',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'fk_signing_key_platform_id',
            },
        },
        generator: {
            type: 'many-to-one',
            target: 'user',
            onDelete: 'SET NULL',
            onUpdate: 'RESTRICT',
            joinColumn: {
                name: 'generatedBy',
                referencedColumnName: 'id',
                foreignKeyConstraintName: 'fk_signing_key_generated_by',
            },
        },
    },
})
