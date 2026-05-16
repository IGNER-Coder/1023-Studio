import type { SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { initiativeType } from './initiative'
import { aboutPageType } from './aboutPage'
import { contactPageType } from './contactPage'
import { siteSettingsType } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  initiativeType,
  aboutPageType,
  contactPageType,
  siteSettingsType,
]
