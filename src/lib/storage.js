import ScratchStorage from 'scratch-storage';

import defaultProject from './default-project';

import axios from '../baseurl';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
const baseurl ="http://18.171.8.65:5000/api"
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.cacheDefaultProject();
    }
    addOfficialScratchWebStores () {
        this.addWebStore(
            [this.AssetType.Project],
            console.log("this.AssetType.Project",this.AssetType.Project),
            this.getProjectGetConfig.bind(this),    
            this.getProjectCreateConfig.bind(this),
            this.getProjectUpdateConfig.bind(this),
            
        );
        this.addWebStore(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            this.getAssetGetConfig.bind(this),
            // We set both the create and update configs to the same method because
            // storage assumes it should update if there is an assetId, but the
            // asset store uses the assetId as part of the create URI.
            this.getAssetCreateConfig.bind(this),
            this.getAssetCreateConfig.bind(this),
        );
        this.addWebStore(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
    }
    setProjectHost (projectHost) {
        this.projectHost = projectHost;
    }
    setProjectToken (projectToken) {
        this.projectToken = projectToken;
    }
    getProjectGetConfig (projectAsset) {
        console.log("enter1")
        console.log("projectAsset",projectAsset)
        const path = `${this.projectHost}/${projectAsset.assetId}`;
        //return path
        console.log("project asset: ", projectAsset.assetId);
        const qs = this.projectToken ? `?token=${this.projectToken}` : '';
        console.log("path+qs",path+qs)
        return path + qs;
    }
    getProjectCreateConfig () {
        console.log("enter2")
        return {
            //method:"get",
            url: `${this.projectHost}/`,
            withCredentials: true
        };
    }
    getProjectUpdateConfig (projectAsset) {
        console.log("enter3")
        return {
            url: `${this.projectHost}/${projectAsset.assetId}`,
            withCredentials: true
        };
    }
    setAssetHost (assetHost) {
        this.assetHost = assetHost;
    }
    getAssetGetConfig (asset) {
       console.log("check assest",asset)
       console.log("asset.assetId",asset.assetId);
        // return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
        console.log("output",`${this.assetHost}/${asset.assetId}.${asset.dataFormat}`);
        
       return `${this.assetHost}/${asset.assetId}.${asset.dataFormat}`;
    }
    getAssetCreateConfig (asset) {
        console.log("assests from storage", asset)
        return {
            // There is no such thing as updating assets, but storage assumes it
            // should update if there is an assetId, and the asset store uses the
            // assetId as part of the create URI. So, force the method to POST.
            // Then when storage finds this config to use for the "update", still POSTs
                method: 'post',
                url: `${baseurl}/master/asset/upload`,
        };
    
    }


    setTranslatorFunction (translator) {
        this.translator = translator;
        this.cacheDefaultProject();
    }
    cacheDefaultProject () {
        const defaultProjectAssets = defaultProject(this.translator);
        console.log("defaultProjectAssets",defaultProjectAssets)
        defaultProjectAssets.forEach(asset => this.builtinHelper._store(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
    }
}

const storage = new Storage();

export default storage;
