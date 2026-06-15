export default function Compare() {
  return (
    <section className="section">
      <p className="eyebrow">Vs the alternatives</p>
      <h2 className="h2">Most libraries pick a lane. We picked a different one.</h2>
      <p className="lead" style={{ marginBottom: 40 }}>
        This isn't a Cursor replacement. It isn't a Tamagui replacement either. It's the library you reach for when you want all three audiences in one repo.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>omniUI</th>
              <th>shadcn</th>
              <th>Radix</th>
              <th>Tamagui</th>
              <th>RN Reusables</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web + React Native</td>
              <td className="accent">single tree</td>
              <td>web only</td>
              <td>web only</td>
              <td>both, with compiler</td>
              <td>native, web ports</td>
            </tr>
            <tr>
              <td>Branded tokens</td>
              <td className="accent">augmentable</td>
              <td>CSS vars</td>
              <td>n/a</td>
              <td>typed</td>
              <td>nativewind</td>
            </tr>
            <tr>
              <td>Icon system</td>
              <td className="accent">registry, typed names</td>
              <td>lucide imports</td>
              <td>n/a</td>
              <td>your own</td>
              <td>your own</td>
            </tr>
            <tr>
              <td>First-party MCP</td>
              <td className="accent">yes</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
            </tr>
            <tr>
              <td>Distribution</td>
              <td className="accent">npm + copy-paste</td>
              <td>copy-paste</td>
              <td>npm</td>
              <td>npm + compiler</td>
              <td>copy-paste</td>
            </tr>
            <tr>
              <td>Theme remix sharing</td>
              <td className="accent">soon (1.0)</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
            </tr>
            <tr>
              <td>AI desktop bundled</td>
              <td className="accent">yes</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
              <td>no</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
