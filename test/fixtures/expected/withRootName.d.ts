interface ISomething {
    fishStore: IFishStore;
    universe: IUniverse;
    hats: IHats;
}
interface IFishStore {
    fish: IFish;
    owner: IOwner;
}
interface IFish {
    organ: IOrgan;
    organAdded: IOrganAdded;
    fishOpened: IFishOpened;
    organRemoved: IOrganRemoved;
}
interface IOrgan {
    title: string;
    a11yLabel: string;
}
interface IOrganAdded {
    type: string;
}
interface IFishOpened {
    type: string;
}
interface IOrganRemoved {
    type: string;
}
interface IOwner {
    youngestChildAge: IYoungestChildAge;
}
interface IYoungestChildAge {
    text: string;
}
interface IUniverse {
    attribution: IAttribution;
}
interface IAttribution {
    troverLink: string;
    wikimediaLink: string;
    wikimediaAlt: string;
}
interface IHats {
    color: string;
    imageAlt: string;
    expensive: string;
    buyMe: string;
}
