# dotfile-types

Generates TypeScript interfaces from `.env`, `.properties`, `.ini`, and other `key-value` pair files,
including nested types.

Currently uses [json-ts](https://github.com/shakyshane/json-ts), and could technically work with flow.

## Usage Example

**Check out [/test/fixtures/expected](https://github.com/sirMerr/dotfile-types/tree/master/test/fixtures/expected) for more example outputs.**

CLI simple usage: `$ dotfile-types <file_path> <out_path>`

```
$ npx dotfile-types l10n.properties interfaces.d.ts
```

Tranforms this:

```
# ./l10n.properties

# What ever happened to the good ol days when it was yesterday
universe.attribution.wikimediaLink=<a href="{0}">Photo</a>
#{2} - I'm a little comment, short and stout.
universe.attribution.wikimediaAlt=Photo "{0}" by {1} ({2}) / Whatchamacalit
#{0} Knock knock. Who's there? Comment. Comment Who?
# Commentary 🥁... 😭
hats.color=Color for {0}
hats.imageAlt=123
hats.expensive=日期已停
hats.buyMe=See all {0} properties in {1}
```

Into this:

```ts
// ./interface.d.ts

interface IRootObject {
  universe: IUniverse;
  hats: IHats;
}
interface IUniverse {
  attribution: IAttribution;
}
interface IAttribution {
  wikimediaLink: string;
  wikimediaAlt: string;
}
interface IHats {
  color: string;
  imageAlt: string;
  expensive: string;
  buyMe: string;
}
```

## Usage (CLI)
```
$ npx dotfile-types
```
```
$ npm install -g dotfile-types
```

```
Usage
$ dotfile-types <file> <outDir>
$ dotfile-types --help
  Options
    --namespace=<namespace_name>	interfaces will be wrapped in a namespace
    --prefix=<prefix_string>			override the I prefix on interface names
    --rootName=<rootname_string>	overide the RootObject name of the top-level interface

  Examples
    $ dotfile-types US_EN.properties
    $ dotfile-types .env types
    $ dotfile-types --namespace API
    $ dotfile-types --prefix "" --rootName "Product"
```

### Usage (API)
```
$ npm install dotfile-types
```
```ts
import dotfileToTS from "dotfile-types";

dotfileToTS("l10n.properties","interfaces.d.ts", {namespace: "Translations"});
```
