/**
 * seedingLifeBoardSampleData.js
 * 
 * script seeding file that won't run with the server. Needs to be executed separately
 * 
 * Seeds database with the three main states: lifeBoard, birthDate and usedColors for the fake-user 'lifeBoardSample'
 * such data is used to render a non-empty <LifeBoard> in AppPage for non-logged users to see how the app feels and play with it
 */


//Pending ask chat gPT how can u download a the data from something u can do using the app, put it here hardcoded, ask him to check this code (imports and add logic for when user doesnt exist)

const { lifeBoardSampleFakeUserId } = require('./dbRoutes');


try {
    const lifeBoardSampleFakeUser = await User.findOne({ _id: lifeBoardSampleFakeUserId });
    //console.log('userData', userData)
    if (lifeBoardSampleFakeUser) {
        //console.log('sample data about to be loaded', updatedBirthDate)

        lifeBoardSampleFakeUser.birthDate = '';
        lifeBoardSampleFakeUser.lifeBoard = '';
        lifeBoardSampleFakeUser.usedColors = '';

        await userData.save();
        return res.json({ message: 'data saved succesfully' });
    } else {
        return res.json({ message: "data couldn't be saved, fake user wasnt found in db" })
    }
} catch (error) {
    console.error('Error saving:', error);
    return res.status(500).json({ error: 'Failed to save' });
}



