# Translation helper ✏️

Helper app to translate auto-generated json files from formatjs to .xlsx

## How to

#### [case 1] Generate .xlsx file:

1. Place formatjs auto-generated json files (`compiled.json` and `extracted.json`) in `./source/backoffice`
2. Run `yarn generate:backoffice`
3. Output file located in `./output/backoffice/backoffice.xlsx`

#### [case 2] Generate .xlsx file for **new UI strings**:

1. Copy and paste translated json strings from [excel](https://docs.google.com/spreadsheets/d/10h_vrlm3XJpgjLkO73x69wp9FKJPkpIHFPqMtboregM/edit#gid=126253426) in `./json/backoffice/translated.json`
2. Run `yarn diff:backoffice`
3. Output file located in `./output/backoffice/backoffice-updated.xlsx`

## Usage

Recommended node version is defined in `.nvmrc`

- `$ yarn install` - Install packages
- `$ yarn generate:backoffice` - Generate json file for backoffice
- `$ yarn generate:mobile` - Generate json file for mobile
- `$ yarn diff:backoffice` - Generate json file of missing fields for backoffice
- `$ yarn diff:mobile` - Generate json file of missing fields for mobile
