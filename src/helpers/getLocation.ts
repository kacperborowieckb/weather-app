export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const getLocation = async (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      (err) => {
        if (err.code === 1) {
          reject("Please allow geolocation");
        }

        reject(err.message);
      }
    );
  });
};
