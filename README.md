# ini-ts
Generates TypeScript interfaces from `.properties`, and other `key-value` pair [`ini`](https://en.wikipedia.org/wiki/INI_file) files,
including nested types.

Currently uses [json-ts](https://github.com/shakyshane/json-ts), and could technically work with flow.

## Usage Example
**Check out [/test/fixtures/expected](https://github.com/sirMerr/ini-ts/tree/master/test/fixtures/expected) for more example outputs.**

CLI simple usage: `$ ini-ts <file_path> <out_path>`
```
$ ini-ts l10n.properties interfaces.d.ts
```

Tranforms this:
```ini
# l10n.properties

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
// interface.d.ts

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
