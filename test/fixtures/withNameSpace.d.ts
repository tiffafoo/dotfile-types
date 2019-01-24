declare namespace Translations {
    export interface IBob {
        fishStore: IFishStore;
        universe: IUniverse;
        hats: IHats;
    }
    export interface IFishStore {
        fish: IFish;
        owner: IOwner;
    }
    export interface IFish {
        organ: IOrgan;
        organAdded: IOrganAdded;
        fishOpened: IFishOpened;
        organRemoved: IOrganRemoved;
    }
    export interface IOrgan {
        title: string;
        a11yLabel: string;
    }
    export interface IOrganAdded {
        type: string;
    }
    export interface IFishOpened {
        type: string;
    }
    export interface IOrganRemoved {
        type: string;
    }
    export interface IOwner {
        youngestChildAge: IYoungestChildAge;
    }
    export interface IYoungestChildAge {
        text: string;
    }
    export interface IUniverse {
        attribution: IAttribution;
    }
    export interface IAttribution {
        troverLink: string;
        wikimediaLink: string;
        wikimediaAlt: string;
    }
    export interface IHats {
        color: string;
        imageAlt: string;
        expensive: string;
        buyMe: string;
    }
}
