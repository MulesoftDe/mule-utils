

interface Target {
  provider: string;
  targetId: string;
}

interface Application {
  status: string;
}

interface Item {
  id: string;
  name: string;
  target: Target;
  status: string;
  application: Application;
}

export default interface App {
  total: number;
  items: Item[];
}
