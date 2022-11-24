import queryString from 'query-string';
import xhr from 'xhr';
import storage from '../lib/storage';
import projectData from "../lib/default-project/project-data"
import axios from '../baseurl';
import { reject, resolve } from 'core-js/fn/promise';
/**
 * Save a project JSON to the project server.
 * This should eventually live in scratch-www.
 * @param {number} projectId the ID of the project, null if a new project.
 * @param {object} vmState the JSON project representation.
 * @param {object} params the request params.
 * @property {?number} params.originalId the original project ID if a copy/remix.
 * @property {?boolean} params.isCopy a flag indicating if this save is creating a copy.
 * @property {?boolean} params.isRemix a flag indicating if this save is creating a remix.
 * @property {?string} params.title the title of the project.
 * @return {Promise} A promise that resolves when the network request resolves.
 */
const defaultProjectJson = projectData();
const projectHost = window.location.host.toString().split(":")
const hostlink = projectHost[1]?window.location.host  : window.location.hostname
export default function (projectId, vmState,projectTitle) {
    const userId = localStorage.getItem('UserId');
    const userRole = localStorage.getItem('UserRole');
    const userToken= localStorage.getItem('UserToken');
    const creatingProject = projectId === null || typeof projectId === 'undefined';
    var URL;
    if(userRole=="student"){
        URL="/u_game"
    }
    if(userRole=="admin"){
        URL="/master/game"
    }
    if (creatingProject) {
        return new Promise((resolve, reject) => {
            
            axios.post(`/master/game/0fdb6080-87e6-4038-baa8-aa4111afdfd7`, {
                name: "NEW PROJECT",
                stage: "01-01",
                json: JSON.stringify(defaultProjectJson),
                belt_id:"b4518c96-4d45-4192-810d-3fd8d16b7c0c"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                },

            })
                .then(response => {
                    if (response.data.success == true) {
                        const id = response.data.game.id
                        window.history.replaceState(null, "creatingNew", `http://${hostlink}/editor.html?project_file=${id}`)
                        resolve(response)
                    }
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })

    }
    else {
        return new Promise((resolve, reject) => {
                axios.put(`${URL}/${projectId}`, {
                name: projectTitle,
                json: vmState
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':userToken
                },

            }
            )
                .then(response => {
                    if (response.data.success == true) {
                        resolve(response)
                    }

                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                }
                )
        })

    }

}